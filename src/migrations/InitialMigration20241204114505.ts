
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialMigration20241204114505 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create User Table
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false
                    },
                ],
            }),
            true
        );

        // Create Todo Table
        await queryRunner.createTable(
            new Table({
                name: "todo",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "isFinished",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "userId",
                        type: "int",
                        isNullable: false
                    },
                ],
            }),
            true
        );

        // Add Foreign Key for Todo -> User
        await queryRunner.createForeignKey(
            "todo",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedTableName: "user",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop Foreign Key
        const table = await queryRunner.getTable("todo");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("todo", foreignKey);

        // Drop Tables
        await queryRunner.dropTable("todo");
        await queryRunner.dropTable("user");
    }
}
