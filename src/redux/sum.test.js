import expect from "expect";
import todoSlice, {
  addTaskThunk,
  deleteAllCheckedTasksThunk,
  deleteTaskThunk,
  getAllTasksThunk,
  selectAllTasksThunk,
  updateTaskThunk,
} from "../redux/todoSlice";
import axios from "axios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore([thunk]);

it("Test should return array of todos", async () => {
  const mockGet = jest.spyOn(axios, "get");
  const mockGetResponse = [
    {
      _id: "123",
      text: "Some Text",
      isDone: false,
      __v: 0,
    },
    {
      _id: "ssdas212uh3344221",
      text: "text2",
      isDone: false,
      __v: 0,
    },
  ];
  mockGet.mockImplementation(() => Promise.resolve({ data: mockGetResponse }));
  const store = mockStore({ todoItems: [] });

  const response = await store.dispatch(getAllTasksThunk());
  const state = todoSlice(store.getState(), {
    type: "todos/getAllTasks/fulfilled",
    payload: response.payload,
  });

  expect(state.todoItems).toEqual(mockGetResponse);
});

it("Test should add new todo in empty array", async () => {
  const mockGet = jest.spyOn(axios, "post");
  const mockResponce = {
    _id: "123",
    text: "Some Text",
    isDone: false,
    __v: 0,
  };
  mockGet.mockImplementation(() => Promise.resolve({ data: mockResponce }));
  const store = mockStore({
    todoItems: [
      {
        _id: "afadfas",
        text: "SosfsasText",
        isDone: false,
        __v: 0,
      },
    ],
  });
  const request = await store.dispatch(addTaskThunk("Some Text"));
  const state = todoSlice(store.getState(), {
    type: "todos/addTaskThunk/fulfilled",
    payload: request.payload,
  });

  expect(state.todoItems.length).toEqual(2);
  expect(state.todoItems[state.todoItems.length - 1]).toEqual(mockResponce);
});

it("Test should delete task by id", async () => {
  const mockGet = jest.spyOn(axios, "delete");
  mockGet.mockImplementation(() =>
    Promise.resolve({
      _id: "ID_123",
      text: "Some Text",
      isDone: false,
      __v: 0,
    })
  );
  const store = mockStore({
    todoItems: [
      {
        _id: "ID_123",
        text: "Some Text",
        isDone: false,
        __v: 0,
      },
    ],
  });
  const request = await store.dispatch(deleteTaskThunk("ID_123"));
  const state = todoSlice(store.getState(), {
    type: "todos/deleteTaskThunk/fulfilled",
    payload: request.payload,
  });

  expect(state).toEqual({ todoItems: [] });
});

it("Test should update todo text", async () => {
  const mockGet = jest.spyOn(axios, "patch");
  const change = { id: "ID_123", changes: { text: "Hohoho" } };
  mockGet.mockImplementation(() =>
    Promise.resolve({
      _id: "ID_123",
      text: "Some Text",
      isDone: false,
      __v: 0,
    })
  );
  const store = mockStore({
    todoItems: [
      {
        _id: "ID_123",
        text: "Some Text",
        isDone: false,
        __v: 0,
      },
    ],
  });
  await store.dispatch(updateTaskThunk(change));
  const state = todoSlice(store.getState(), {
    type: "todos/updateTaskThunk/fulfilled",
    payload: change,
  });
  const newStore = store.getState();
  newStore.todoItems[0].text = change.changes.text;

  expect(state).toEqual(newStore);
});

it('Should change all "isDone" flags', async () => {
  const mockGet = jest.spyOn(axios, "patch");
  const changeOn = true;
  mockGet.mockImplementation(() => Promise.resolve(null));
  const store = mockStore({
    todoItems: [
      {
        _id: "ID_123",
        text: "Some Text",
        isDone: false,
        __v: 0,
      },
      {
        _id: "ID_321",
        text: "S asdfdsa",
        isDone: true,
        __v: 0,
      },
    ],
  });
  await store.dispatch(selectAllTasksThunk(changeOn));
  const state = todoSlice(store.getState(), {
    type: "todos/selectAllTasksThunk/fulfilled",
    payload: changeOn,
  });

  state.todoItems.map((el) => {
    expect(el.isDone).toBe(changeOn);
  });
});

it('Should delete all tasks with "isDone":true fields', async () => {
  const mockGet = jest.spyOn(axios, "delete");
  mockGet.mockImplementation(() => Promise.resolve(null));
  const store = mockStore({
    todoItems: [
      {
        _id: "ID_321",
        text: "S asdfdsa",
        isDone: true,
        __v: 0,
      },
      {
        _id: "ID_123",
        text: "Some Text",
        isDone: false,
        __v: 0,
      },
      {
        _id: "ID_21_rf3",
        text: "Some Text",
        isDone: false,
        __v: 0,
      },
      {
        _id: "ID_sdafsa1",
        text: "S asdfdsa",
        isDone: true,
        __v: 0,
      },
    ],
  });
  await store.dispatch(deleteAllCheckedTasksThunk());
  const state = todoSlice(store.getState(), {
    type: "todos/deleteAllCheckedTasksThunk/fulfilled",
    payload: null,
  });
  
  expect(state.todoItems.length).toBe(2);
  expect(state).toEqual({
    todoItems: [
      {
        _id: "ID_123",
        text: "Some Text",
        isDone: false,
        __v: 0,
      },
      {
        _id: "ID_21_rf3",
        text: "Some Text",
        isDone: false,
        __v: 0,
      },
    ],
  });
});
