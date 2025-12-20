const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

export const mockLessons = [
  {
    id: "lesson1",
    type: "group",
    style: "freestyle",
    instructor: { id: "i1", name: "Yotam"},
    students: [
      { id: "s1", name: "Noam", lastName: "Cohen" },
      { id: "s2", firstName: "Maya", lastName: "Rosen" },
      { id: "s3", firstName: "Itay", lastName: "Bitan" },
    ],
    start: new Date(y, m, d, 9, 0),
    end: new Date(y, m, d, d, 10, 0),
  },
  {
    id: "lesson2",
    type: "private",
    style: "butterfly",
    instructor: { id: "i2", name: "Yoni" },
    students: [
      { id: "s4", firstName: "Dina", lastName: "Katz" },
    ],
    start: new Date(y, m, d, 11, 0),
    end: new Date(y, m, d, 11, 45),
  },
];
