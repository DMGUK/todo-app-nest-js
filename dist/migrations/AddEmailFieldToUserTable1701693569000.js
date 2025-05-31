"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailFieldToUserTable1701693569000 = void 0;
const typeorm_1 = require("typeorm");
class AddEmailFieldToUserTable1701693569000 {
    async up(queryRunner) {
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('user', 'email');
    }
}
exports.AddEmailFieldToUserTable1701693569000 = AddEmailFieldToUserTable1701693569000;
//# sourceMappingURL=AddEmailFieldToUserTable1701693569000.js.map