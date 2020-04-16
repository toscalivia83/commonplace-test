import { UserFormDetails, AnswerResponse, OptionsResponse } from "../types/app";
import { HttpError, BaseResponse } from "../types/http";

export class ApiClient {
  public readonly host: string;

  public constructor(baseUrl: string) {
    this.host = baseUrl;
  }

  public async getUserAnswers(): Promise<BaseResponse<AnswerResponse[]>> {
    const uri = `${this.host}/api/answers`;
    const response = await fetch(uri);

    try  {
      const responseJson = await response.json();
      return {
        statusCode: response.status,
        result: responseJson
      };
    } catch (e) {
      const error: HttpError = new Error(`request for ${uri} failed`);
      error.notFound = response.status === 404;
      error.status = response.status;
      throw error;
    }
  }

  public async getOptions(): Promise<BaseResponse<OptionsResponse>> {
    const uri = `${this.host}/api/options`;
    const response = await fetch(uri);

    try  {
      const responseJson = await response.json();
      return {
        statusCode: response.status,
        result: responseJson
      };
    } catch (e) {
      const error: HttpError = new Error(`request for ${uri} failed`);
      error.notFound = response.status === 404;
      error.status = response.status;
      throw error;
    }
  }

  public async postUserForm(userForm: UserFormDetails): Promise<BaseResponse<string>> {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userForm)
    };
    const uri = `${this.host}/api/answer`;
    const response = await fetch(uri, requestOptions);

    try  {
      const responseText = await response.text();
      return {
        statusCode: response.status,
        result: responseText
      };
    } catch (e) {
      const error: HttpError = new Error(`request for ${uri} failed`);
      error.notFound = response.status === 404;
      error.status = response.status;
      throw error;
    }
  }
}

export default new ApiClient(`${window.location.protocol}//${window.location.host}`);