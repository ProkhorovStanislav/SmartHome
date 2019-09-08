export default {
  devices: [
    {
      id: "F972B82BA56A70CC579945773B6866FB",
      name: "Посудомоечная машина",
      power: 950,
      duration: 3,
      mode: "night"
    },
    {
      id: "C515D887EDBBE669B2FDAC62F571E9E9",
      name: "Духовка",
      power: 2000,
      duration: 2,
      mode: "day"
    },
    {
      id: "02DDD23A85DADDD71198305330CC386D",
      name: "Холодильник",
      power: 50,
      duration: 24
    },
    {
      id: "1E6276CC231716FE8EE8BC908486D41E",
      name: "Термостат",
      power: 50,
      duration: 24
    },
    {
      id: "7D9DC84AD110500D284B33C82FE6E85E",
      name: "Кондиционер",
      power: 850,
      duration: 1
    },
    {
      id: "43DF095EE1105DC64A09CCC2319B29B3",
      name: "Пылесос",
      power: 1500,
      duration: 1,
      mode: "day"
    },
    {
      id: "8B73CD23A853C82D9834B3C82FE1050C",
      name: "Компьютер",
      power: 200,
      duration: 8,
      mode: "day"
    },
    {
      id: "D0D28423A857119830B3B6276CC23171",
      name: "Насос скважины",
      power: 1000,
      duration: 1
    }
  ],
  rates: [
    {
      from: 7,
      to: 10,
      value: 6.46
    },
    {
      from: 10,
      to: 17,
      value: 5.38
    },
    {
      from: 17,
      to: 21,
      value: 6.46
    },
    {
      from: 21,
      to: 23,
      value: 5.38
    },
    {
      from: 23,
      to: 7,
      value: 1.79
    }
  ],
  maxPower: 2100
};
