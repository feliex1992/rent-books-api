import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TransactionHelper {
  constructor(@InjectConnection() private connection: Connection) {}

  async startTransaction(): Promise<ClientSession> {
    const session: ClientSession = await this.connection.startSession();
    await session.startTransaction();
    return session;
  }

  async commitTransaction(session: ClientSession) {
    await session.commitTransaction();
    await session.endSession();
  }

  async rollbackTransaction(session: ClientSession) {
    await session.abortTransaction();
    await session.endSession();
  }
}
