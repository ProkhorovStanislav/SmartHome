const errors: Array<string> = [];

export function validateResponseData(responseData: {
  devices: Array<{
    withError?: boolean;
    id: string;
    name: string;
    power: number;
    duration: number;
  }>;
  rates: Array<{ from: number; to: number; value: number }>;
  maxPower: number;
  isErrorInDevices?: boolean;
}) {
  try {
    !responseData && handleError("Входные данные не переданы");
    !responseData.devices &&
      handleError("Входные данные о приборах не переданы");
    !responseData.devices.length &&
      handleError("Вы не добавили ни одного прибора");
    !responseData.maxPower &&
      handleError("Входные данные о мощности не переданы");
    +responseData.maxPower < 0 &&
      handleError("Входные данные о мощности некорректны");
    responseData.rates.forEach(item => checkRate(item));
    responseData.devices.forEach(item => checkDevice(item, responseData));

    if (responseData.isErrorInDevices) {
      const correctDevices = responseData.devices.filter(
        item => !item.withError
      );
      return { ...responseData, devices: correctDevices, errors };
    } else {
      return responseData;
    }
  } catch (e) {
    return { errors, hasCriticalErrors: true };
  }
}

const handleError = (
  text: string,
  isCritical?: boolean,
  item?: { withError?: boolean }
) => {
  errors.push(text);
  if (isCritical) {
    throw new Error(text);
  }
  if (item) {
    item.withError = true;
  } else {
    console.error(text);
  }
};

const checkDevice = (
  device: {
    id: string;
    name: string;
    power: number;
    duration: number;
    withError?: boolean;
  },
  responseData: {
    devices: Array<{
      withError?: boolean;
      id: string;
      name: string;
      power: number;
    }>;
    rates: Array<object>;
    maxPower: number;
    isErrorInDevices?: boolean;
  }
) => {
  if (typeof device.id !== "string") {
    handleError(
      "Id одного из приборов некорректен. Прибор будет удален из списка",
      false,
      device
    );
    responseData.isErrorInDevices = true;
  }
  if (typeof device.name !== "string") {
    handleError(
      "Название одного из приборов некорректною. Прибор будет удален из списка",
      false,
      device
    );
    responseData.isErrorInDevices = true;
  }
  if (typeof +device.power !== "number") {
    handleError(
      "Значение мощности одного из приборов некорректно. Прибор будет удален из списка",
      false,
      device
    );
    responseData.isErrorInDevices = true;
  }
  if (
    typeof +device.duration !== "number" ||
    device.duration < 0 ||
    device.duration > 24
  ) {
    handleError(
      "Значение цикла одного из приборов некорректно. Прибор будет удален из списка",
      false,
      device
    );
    responseData.isErrorInDevices = true;
  }
};

const checkRate = (rate: { from: number; to: number; value: number }) => {
  if (
    typeof +rate.from !== "number" ||
    !isInteger(+rate.from) ||
    rate.to < 0 ||
    rate.to > 24
  ) {
    handleError(
      "Стартовое время одного из тарифов некорректно. Невозможно произвести расчет",
      true
    );
  }
  if (
    typeof +rate.to !== "number" ||
    !isInteger(+rate.to) ||
    rate.to < 0 ||
    rate.to > 24
  ) {
    handleError(
      "Конечное время одного из тарифов некорректно. Невозможно произвести расчет",
      true
    );
  }
  if (typeof +rate.value !== "number" || rate.value < 0) {
    handleError(
      "Значение одного из тарифов некорректно. Невозможно произвести расчет",
      true
    );
  }
};

const isInteger = (number: number) => (number ^ 0) === number;
