import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersPermissions1636722253641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_permissions',
        columns: [
          {
            name: 'permission_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_roles_user',
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
            columnNames: ['permission_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_users_permissions',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_permissions');
  }
}
