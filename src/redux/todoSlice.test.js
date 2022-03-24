import expect from "expect";
import todoSlice, {
  addTaskThunk,
  createUserThunk,
  deleteAllCheckedTasksThunk,
  deleteTaskThunk,
  getAllTasksThunk,
  loginUserThunk,
  logOutUserThunk,
  selectAllTasksThunk,
  updateTaskThunk,
} from "./todoSlice";
import axios from "axios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore([thunk]);

// ------- Succesed API calls --------
describe("When API call is succesfull", () => {
  it("Test should return array of todos", async () => {
    const mockGet = jest.spyOn(axios, "get");
    const mockGetResponse = {
      todoItems: [
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
      ],
    };
    mockGet.mockImplementation(() =>
      Promise.resolve({ data: mockGetResponse })
    );
    const store = mockStore({ todoItems: [] });
    const response = await store.dispatch(getAllTasksThunk());
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(response.type).toBe("todos/getAllTasks/fulfilled");
    expect(response.payload.todoItems.length).toBe(2);
    expect(state.todoItems).toEqual(mockGetResponse.todoItems);
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

    const response = await store.dispatch(addTaskThunk("Some Text"));
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(response.type).toBe("todos/addTaskThunk/fulfilled");
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
    const response = await store.dispatch(deleteTaskThunk("ID_123"));
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(response.type).toBe("todos/deleteTaskThunk/fulfilled");
    expect(state).toEqual({ todoItems: [] });
  });

  it("Test should update todo text", async () => {
    const mockGet = jest.spyOn(axios, "patch");
    const change = { id: "ID_123", changes: { text: "Hohoho" } };
    const responseObject = {
      _id: "ID_123",
      text: "Some Text",
      isDone: false,
      __v: 0,
    };
    mockGet.mockImplementation(() => Promise.resolve(responseObject));
    const store = mockStore({ todoItems: [responseObject] });
    const response = await store.dispatch(updateTaskThunk(change));
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: change,
    });
    const newStore = store.getState();
    newStore.todoItems[0].text = change.changes.text;

    expect(response.type).toBe("todos/updateTaskThunk/fulfilled");
    expect(state.todoItems.length).toBe(1);
    expect(state).toEqual(newStore);
  });

  it('Should change all "isDone" flags', async () => {
    const mockGet = jest.spyOn(axios, "patch");
    const changeOn = true;
    mockGet.mockImplementation(() => Promise.resolve());
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
    const response = await store.dispatch(selectAllTasksThunk(changeOn));
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: changeOn,
    });
    expect(response.type).toBe("todos/selectAllTasksThunk/fulfilled");
    state.todoItems.map((el) => {
      expect(el.isDone).toBe(changeOn);
    });
  });

  it("Should delete all tasks with {isDone:true} fields", async () => {
    const mockGet = jest.spyOn(axios, "delete");
    mockGet.mockImplementation(() => Promise.resolve());
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
    const response = await store.dispatch(deleteAllCheckedTasksThunk());
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: null,
    });
    expect(response.type).toBe("todos/deleteAllCheckedTasksThunk/fulfilled");
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

  it("Should add new User", async () => {
    const mockGet = jest.spyOn(axios, "post");
    const mockResponce = {
      password: "$2b$10$cfa5tL5yPaEWC2XnbiZF/O9UxJmYi4wh4fWv/2EaHiKNHdLuH7aYe",
      username: "bob@bob.bob",
      name: "bob",
      _id: "623827a5795bb903b9f6fc1f",
      __v: 0,
    };
    mockGet.mockImplementation(() => Promise.resolve({ data: mockResponce }));
    const store = mockStore({
      todoItems: [],
      isLoggedIn: false,
      loginFailed: false,
      name: "",
    });

    const response = await store.dispatch(
      createUserThunk({
        password: "123",
        username: "bob@bob.bob",
        name: "bob",
      })
    );
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(response.type).toBe("todos/createUserThunk/fulfilled");
    expect(response.payload).toBe(mockResponce);
  });

  it("Should Login in system", async () => {
    const mockGet = jest.spyOn(axios, "post");
    const mockResponce = {
      message: "Login successful",
      name: "bob",
    };
    mockGet.mockImplementation(() => Promise.resolve({ data: mockResponce }));
    const store = mockStore({
      todoItems: [],
      isLoggedIn: false,
      loginFailed: false,
      name: "",
    });

    const response = await store.dispatch(
      loginUserThunk({
        password: "123",
        username: "bob@bob.bob",
      })
    );
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(response.type).toBe("todos/loginUserThunk/fulfilled");
    expect(response.payload).toBe("ok");
  });

  it("Should log out from system", async () => {
    const mockGet = jest.spyOn(axios, "post");
    const mockResponce = {
      message: "Login successful",
      name: "bob",
    };
    mockGet.mockImplementation(() => Promise.resolve({ data: mockResponce }));
    const store = mockStore({
      todoItems: [
        {
          _id: "123",
          text: "Hello",
          author_id: "12347238ryf",
          isDone: true,
          __v: "0",
        },
      ],
      isLoggedIn: true,
      loginFailed: false,
      name: "bob",
    });

    const response = await store.dispatch(logOutUserThunk());
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(response.type).toBe("todos/logOutUserThunk/fulfilled");
    expect(response.payload).toBe(undefined);
  });
});

// ------- Failed API calls --------
describe("When API call fails", () => {
  it("Should throw an Error during getting all todos", async () => {
    const mockGet = jest.spyOn(axios, "get");
    mockGet.mockImplementation(() =>
      Promise.reject([
        {
          _id: "123",
          text: "Some Text",
          isDone: false,
          __v: 0,
        },
      ])
    );
    const store = mockStore({ todoItems: [] });
    const response = await store.dispatch(getAllTasksThunk());
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(store.getState()).toEqual(state);
    expect(response.type).toBe("todos/getAllTasks/rejected");
    expect(response.error.message).toBe("Server error, cannot get tasks");
  });

  it("Should throw an Error during add new todo", async () => {
    const mockGet = jest.spyOn(axios, "post");
    mockGet.mockImplementation(() =>
      Promise.reject({
        _id: "123",
        text: "Some Text",
        isDone: false,
        __v: 0,
      })
    );
    const store = mockStore({ todoItems: [] });
    const response = await store.dispatch(addTaskThunk("Some Text"));
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(store.getState()).toEqual(state);
    expect(response.type).toBe("todos/addTaskThunk/rejected");
    expect(response.error.message).toBe("Server error, can not add new task");
  });

  it("Should throw an Error during deleting todo", async () => {
    const mockGet = jest.spyOn(axios, "delete");
    mockGet.mockImplementation(() => Promise.reject({}));
    const store = mockStore({
      todoItems: [
        {
          _id: "123",
          text: "Some Text",
          isDone: false,
          __v: 0,
        },
      ],
    });
    const response = await store.dispatch(deleteTaskThunk("123"));
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(store.getState()).toEqual(state);
    expect(response.type).toBe("todos/deleteTaskThunk/rejected");
    expect(response.error.message).toBe("Server error, can not delete task");
  });

  it("Should throw an Error during updating todo", async () => {
    const mockGet = jest.spyOn(axios, "patch");
    const change = { id: "ID_123", changes: { text: "Hohoho" } };
    const responseObject = {
      _id: "ID_123",
      text: "Some Text",
      isDone: false,
      __v: 0,
    };
    mockGet.mockImplementation(() => Promise.reject(responseObject));
    const store = mockStore({ todoItems: [responseObject] });
    const response = await store.dispatch(updateTaskThunk(change));
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(store.getState()).toEqual(state);
    expect(response.type).toBe("todos/updateTaskThunk/rejected");
    expect(response.error.message).toBe("Server error, can not update task");
  });

  it('Should throw an Error during changing all "isDone" flags', async () => {
    const mockGet = jest.spyOn(axios, "patch");
    const changeOn = true;
    mockGet.mockImplementation(() => Promise.reject());
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
    const response = await store.dispatch(selectAllTasksThunk(changeOn));
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(store.getState()).toEqual(state);
    expect(response.type).toBe("todos/selectAllTasksThunk/rejected");
    expect(response.error.message).toBe("Server error, can not change tasks");
  });

  it("Should throw an Error during deleting all tasks with {isDone:true} fields", async () => {
    const mockGet = jest.spyOn(axios, "delete");
    mockGet.mockImplementation(() => Promise.reject());
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
    const response = await store.dispatch(deleteAllCheckedTasksThunk());
    const state = todoSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(store.getState()).toEqual(state);
    expect(response.type).toBe("todos/deleteAllCheckedTasksThunk/rejected");
    expect(response.error.message).toBe("Server error, can not delete tasks");
  });
});
