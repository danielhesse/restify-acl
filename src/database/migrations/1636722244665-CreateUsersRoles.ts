import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersRoles1636722244665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_roles',
        columns: [
          {
            name: 'role_id',
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
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            columnNames: ['role_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_users_roles',
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
    await queryRunner.dropTable('users_roles');
  }
}
