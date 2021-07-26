export default interface ICreateProductRequest {
  code: string;
  name: string;
  description: string;
  quantity: number;
  minStock?: number;
  cost: number;
  price: number;
}
