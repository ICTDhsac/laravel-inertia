<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Department;
use App\Models\Office;
use App\Models\User;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            ['name' => 'Human Resource Development Division', 'office_id' => 1, 'department_head_id' => 127],
            ['name' => 'General Services Division', 'office_id' => 1, 'department_head_id' => 137],
            ['name' => 'Records Division', 'office_id' => 1, 'department_head_id' => 159],
            ['name' => 'Accounting Division', 'office_id' => 2, 'department_head_id' => 163],
            ['name' => 'Budget Division', 'office_id' => 2, 'department_head_id' => 168],
            ['name' => 'Enforcement Division', 'office_id' => 3, 'department_head_id' => 244],
            ['name' => 'Legal Assistance Division', 'office_id' => 3, 'department_head_id' => 244],
            ['name' => 'Management Division', 'office_id' => 4, 'department_head_id' => 179],
            ['name' => 'Planning,  Monitoring and Evaluation Division', 'office_id' => 4, 'department_head_id' => 186],
            ['name' => 'Information and Communications Technology Division', 'office_id' => 5, 'department_head_id' => 118],
            ['name' => 'Public Affairs Division', 'office_id' => 6, 'department_head_id' => 358],
            ['name' => 'Office of the Executive Commissioner', 'office_id' => 8],
            ['name' => 'Office of Commissioner FJE', 'office_id' => 26],
            ['name' => 'Office of Commissioner SEY', 'office_id' => 27],
            ['name' => 'Office of Commissioner JCM', 'office_id' => 28],
            ['name' => 'Office of Commissioner MPC', 'office_id' => 29],
            ['name' => 'Office of the Director - AS', 'office_id' => 1],
            ['name' => 'Office of the Director - FS', 'office_id' => 2],
            ['name' => 'Office of the Director - PMS', 'office_id' => 4],
            ['name' => 'Office of the Director - LS', 'office_id' => 3],
            ['name' => 'Office of the Executive Clerk', 'office_id' => 7, 'department_head_id' => 204],
            ['name' => 'Commission on Audit', 'office_id' => 25],
            ['name' => 'Office of the Regional Adjudicator - NCR', 'office_id' => 9],
            ['name' => 'Office of the Regional Adjudicator  - CAR', 'office_id' => 10],
            ['name' => 'Office of the Regional Adjudicator - I', 'office_id' => 11],
            ['name' => 'Office of the Regional Adjudicator - II', 'office_id' => 12],
            ['name' => 'Office of the Regional Adjudicator - III', 'office_id' => 13],
            ['name' => 'Office of the Regional Adjudicator - IV A', 'office_id' => 14],
            ['name' => 'Office of the Regional Adjudicator - IV B', 'office_id' => 15],
            ['name' => 'Office of the Regional Adjudicator - V', 'office_id' => 16],
            ['name' => 'Office of the Regional Adjudicator - VI', 'office_id' => 17],
            ['name' => 'Office of the Regional Adjudicator - VII', 'office_id' => 18],
            ['name' => 'Office of the Regional Adjudicator - VIII', 'office_id' => 19],
            ['name' => 'Office of the Regional Adjudicator - IX', 'office_id' => 20],
            ['name' => 'Office of the Regional Adjudicator - X', 'office_id' => 21],
            ['name' => 'Office of the Regional Adjudicator - XI', 'office_id' => 22],
            ['name' => 'Office of the Regional Adjudicator - XII', 'office_id' => 23],
            ['name' => 'Office of the Regional Adjudicator - XIII', 'office_id' => 24],
            ['name' => 'Administrative and Finance Division - NCR', 'office_id' => 9, 'department_head_id' => 318],
            ['name' => 'Administrative and Finance Division - CAR', 'office_id' => 10],
            ['name' => 'Administrative and Finance Division - I', 'office_id' => 11],
            ['name' => 'Administrative and Finance Division - II', 'office_id' => 12],
            ['name' => 'Administrative and Finance Division - III', 'office_id' => 13],
            ['name' => 'Administrative and Finance Division - IV A', 'office_id' => 14],
            ['name' => 'Administrative and Finance Division - IV B', 'office_id' => 15, 'department_head_id' => 325],
            ['name' => 'Administrative and Finance Division - V', 'office_id' => 16],
            ['name' => 'Administrative and Finance Division - VI', 'office_id' => 17],
            ['name' => 'Administrative and Finance Division - VII', 'office_id' => 18],
            ['name' => 'Administrative and Finance Division - VIII', 'office_id' => 19],
            ['name' => 'Administrative and Finance Division - IX', 'office_id' => 20],
            ['name' => 'Administrative and Finance Division - X', 'office_id' => 21],
            ['name' => 'Administrative and Finance Division - XI', 'office_id' => 22],
            ['name' => 'Administrative and Finance Division - XII', 'office_id' => 23],
            ['name' => 'Administrative and Finance Division - XIII', 'office_id' => 24],
            ['name' => 'Legal Division - NCR', 'office_id' => 9, 'department_head_id' => 308],
            ['name' => 'Legal Division - CAR', 'office_id' => 10],
            ['name' => 'Legal Division - I', 'office_id' => 11],
            ['name' => 'Legal Division - II', 'office_id' => 12],
            ['name' => 'Legal Division - III', 'office_id' => 13],
            ['name' => 'Legal Division - IV A', 'office_id' => 14],
            ['name' => 'Legal Division - IV B', 'office_id' => 15, 'department_head_id' => 136],
            ['name' => 'Legal Division - V', 'office_id' => 16],
            ['name' => 'Legal Division - VI', 'office_id' => 17],
            ['name' => 'Legal Division - VII', 'office_id' => 18],
            ['name' => 'Legal Division - VIII', 'office_id' => 19],
            ['name' => 'Legal Division - IX', 'office_id' => 20],
            ['name' => 'Legal Division - X', 'office_id' => 21],
            ['name' => 'Legal Division - XI', 'office_id' => 22],
            ['name' => 'Legal Division - XII', 'office_id' => 23],
            ['name' => 'Legal Division - XIII', 'office_id' => 24],
        ];

        foreach ($departments as $department) {
            Department::create($department);
        }
    }
}
