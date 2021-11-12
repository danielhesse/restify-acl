import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePermissionsRoles1636722233843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions_roles',
        columns: [
          {
            name: 'role_id',
            type: 'uuid',
          },
          {
            name: 'permission_id',
            type: 'uuid',
          },
        ],

        foreignKeys: [
          {
            name: 'fk_permissions_roles',
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
            columnNames: ['permission_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_roles_permissions',
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            columnNames: ['role_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permissions_roles');
  }
}
