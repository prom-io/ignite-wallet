import {EntityManager, EntityRepository, Repository} from "typeorm";
import {UserEntity} from "../entities/User.entity";

@EntityRepository()
export class UserRepository {

    constructor(private manager: EntityManager) {}

    public findOne(username: string): Promise<UserEntity | undefined> {
        return this.manager.findOne(UserEntity, { where: { username } });
    }
}
