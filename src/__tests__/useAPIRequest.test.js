import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useAPIRequest from "./../hooks/useAPIRequest";

test("useFetch performs GET request", async () => {
  const initialValue = [];
  const mock = new MockAdapter(axios);

  const mockData = "response";
  const url = "https://assignment.bunq.com/api/user";
  mock.onGet(url).reply(200, mockData);

  const { result, waitForNextUpdate } = renderHook(() =>
    useAPIRequest('get', url)
  );

  expect(result.current.data).toEqual({});
  expect(result.current.isLoading).toBeTruthy();

  await waitForNextUpdate();

  expect(result.current.data).toEqual("response");
  expect(result.current.isLoading).toBeFalsy();
});