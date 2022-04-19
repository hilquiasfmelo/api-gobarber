import { getMongoRepository, MongoRepository } from 'typeorm';

import { ICreateNotificationDTO } from '@modules/notifications/dtos/ICreateNotificationDTO';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { Notification } from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private notificationsRepository: MongoRepository<Notification>;

  constructor() {
    this.notificationsRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      content,
      recipient_id,
    });

    await this.notificationsRepository.save(notification);

    return notification;
  }
}

export { NotificationsRepository };
