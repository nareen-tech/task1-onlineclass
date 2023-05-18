import DataResponse from './DataResponse';

export default interface ErrorHandler extends DataResponse {
  stack?: string;
  success?: boolean;
}