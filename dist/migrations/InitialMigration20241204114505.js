"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration20241204114505 = void 0;
const typeorm_1 = require("typeorm");
class InitialMigration20241204114505 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'todo',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'isFinished',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('todo', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('todo');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('userId') !== -1);
        await queryRunner.dropForeignKey('todo', foreignKey);
        await queryRunner.dropTable('todo');
        await queryRunner.dropTable('user');
    }
}
exports.InitialMigration20241204114505 = InitialMigration20241204114505;
//# sourceMappingURL=InitialMigration20241204114505.js.map