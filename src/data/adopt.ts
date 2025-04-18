import { IFilter, IPet } from "@/configs/interface";

export const dataTakeAction = {
  categories: [
    {
      id: "dog",
      name: "dogs",
    },
    {
      id: "cat",
      name: "cats",
    },
    {
      id: "rabbit",
      name: "rabbits",
    },
    {
      id: "hamster",
      name: "hamsters",
    },
    {
      id: "other",
      name: "others",
    },
  ] as IFilter[],
  sorts: [
    {
      value: "",
      title: "sort",
    },
    {
      value: "up",
      title: "up",
    },
    {
      value: "down",
      title: "down",
    },
  ],

  fillters: {
    colors: ["White", "Black", "Green", "Yellow"],
    ages: [
      { id: "baby", name: "Baby" },
      { id: "medium", name: "Medium" },
      { id: "adult", name: "Adult" },
    ],
    genthers: [
      { id: "male", name: "Male" },
      { id: "female", name: "Female" },
    ],
    status: [
      { id: "healthy", name: "Healthy" },
      { id: "sick", name: "Sick" },
      { id: "deceased", name: "Deceased" },
    ],
  },
  pets: [
    {
      id: 1,
      breed: "husky",
      name: "lokbok",
      image:
        "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ",
      description: `The dog was hit by a car, broke his leg, and lost his eye for 2-3 days at an intersection`,
      fostered: "12/09/2022",
      size: "medium",
      sex: "male",
      type: "dog",
      fosterDate: 300,
      like: true,
    },
    {
      id: 2,
      breed: "husky",
      name: "lokbok",
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg",
      description: `The dog was hit by a car, broke his leg, and lost his eye for 2-3 days at an intersection`,
      fostered: "12/09/2022",
      size: "medium",
      sex: "male",
      type: "dog",
      fosterDate: 300,
      like: true,
    },
    {
      id: 3,
      breed: "husky",
      name: "lokbok",
      image:
        "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ",
      description: `The dog was hit by a car, broke his leg, and lost his eye for 2-3 days at an intersection`,
      fostered: "12/09/2022",
      size: "medium",
      sex: "male",
      type: "dog",
      fosterDate: 300,
      like: true,
    },
    {
      id: 4,
      breed: "husky",
      name: "lokbok",
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg",
      description: `The dog was hit by a car, broke his leg, and lost his eye for 2-3 days at an intersection`,
      fostered: "12/09/2022",
      size: "medium",
      sex: "male",
      type: "dog",
      fosterDate: 300,
      like: true,
    },
    {
      id: 5,
      breed: "husky",
      name: "lokbok",
      image:
        "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ",
      description: `The dog was hit by a car, broke his leg, and lost his eye for 2-3 days at an intersection`,
      fostered: "12/09/2022",
      size: "medium",
      sex: "male",
      type: "dog",
      fosterDate: 300,
      like: true,
    },
    {
      id: 6,
      breed: "husky",
      name: "lokbok",
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg",
      description: `The dog was hit by a car, broke his leg, and lost his eye for 2-3 days at an intersection`,
      fostered: "12/09/2022",
      size: "medium",
      sex: "male",
      type: "dog",
      fosterDate: 300,
      like: false,
    },
    {
      id: 7,
      breed: "husky",
      name: "lokbok",
      image:
        "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ",
      description: `The dog was hit by a car, broke his leg, and lost his eye for 2-3 days at an intersection`,
      fostered: "12/09/2022",
      size: "medium",
      sex: "male",
      type: "dog",
      fosterDate: 300,
      like: true,
    },
    {
      id: 8,
      breed: "husky",
      name: "lokbok",
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg",
      description: `The dog was hit by a car, broke his leg, and lost his eye for 2-3 days at an intersection`,
      fostered: "12/09/2022",
      size: "medium",
      sex: "male",
      type: "dog",
      fosterDate: 300,
      like: false,
    },
  ] as IPet[],
};
