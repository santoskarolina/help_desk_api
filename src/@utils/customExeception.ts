import { HttpException } from "@nestjs/common";
import { ErrosEnum } from "src/models/error.enum";

export class CustomHttpException extends HttpException {
  type: ErrosEnum;
  message: string;
  code: number;

    constructor(status: number, message: string, type: ErrosEnum) {
      super(message, status);
      this.type = type;
      this.message = message;
      this.code = status;
    }
  }
 