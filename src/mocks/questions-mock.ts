import { Guid } from 'guid-typescript';
import { Question } from 'src/models/Question';


export const questionsList: Question[] = [
    {
      id: 1,
      category: { id: 1, name: "WŁADCY POLSKI"},
      points: 100,
      content: "Jego podobizna widnieje na banknocie 10 zł.",
      answer: "Mieszko I"
    },
    {
        id: 2,
        category: { id: 2, name: "REKORDY GEOGRAFICZNE"},
        points: 300,
        content: "Jest to najwyższy wodospad na świecie.",
        answer: "Salto Angel"
    },
    {
        id: 3,
        category: { id: 3, name: "GWIAZDY I PLANETY"},
        points: 150,
        content: "Jest największą planetą Układu Słonecznego.",
        answer: "Jowisz"
    },
    {
      id: 4,
      category: { id: 4, name: "WIELKIE BITWY"},
      points: 100,
      content: "Kulminacyjny moment Wielkiej Wojny, toczonej przez Państwo Zakonu Krzyżackiego oraz Polskę i Litwę.",
      answer: "bitwa pod Grunwaldem"
  },
  ];