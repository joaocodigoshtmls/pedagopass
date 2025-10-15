import { Request, Response } from 'express';

class HelloController {
  public async hello(req: Request, res: Response): Promise<void> {
    const response = {
      message: "Backend do PedagoPass funcionando!",
      status: "success",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      endpoints: {
        health: "/api/hello",
        destinos: "/api/destinos",
        users: "/api/users"
      }
    };
    
    res.status(200).json(response);
  }
}

export default new HelloController();
