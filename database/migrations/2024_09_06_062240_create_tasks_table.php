<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('user_id')          // Define the foreign key column as foreignId
            //         ->constrained('users')        // Reference the users table
            //         ->onDelete('cascade'); 
            $table->string('title');
            $table->text('body')->nullable();
            $table->string('status')->default('1');
            $table->integer('sortIndex')->default(0);
            $table->timestamps();

            // $table->unsignedBigInteger('user_id');  // Define the user_id column
            // $table->foreign('user_id')           // Then, apply the foreign key constraint
            //         ->references('id')           // Referenced column in the related table (e.g., 'id' column)
            //         ->on('users')                // The table being joined
            //         ->onDelete('cascade');       // Cascade delete action
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['user_id']); 
        });

        Schema::dropIfExists('tasks');
    }
};
