import { ChessClockError } from "./ChessClockError";

export class UnexpectedCallWhileNotReadyError extends ChessClockError {
  name = "UnexpectedCallWhileNotReadyError";
}
