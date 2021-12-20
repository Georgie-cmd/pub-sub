import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length, MaxLength, MinLength } from "class-validator"


export class CreateUserDto {
    @ApiProperty({example: 'Justin', description: 'User\'s name'})
    @IsString({message: 'Name must be included uppercase letter and string letters...'})
    @MinLength(3, {message: 'Name must be at least 3 characters...'})
    @MaxLength(18)
    readonly name: string

    @ApiProperty({example: 'Bieber', description: 'User\'s surname'})
    @IsString({message: 'Surname must be included uppercase letter and string letters...'})
    @MinLength(3, {message: 'Surname must be at least 3 characters...'})
    @MaxLength(25)
    readonly surname: string

    @ApiProperty({example: 'justinbieber@gmail.com', description: 'User\'s email'})
    @IsEmail({}, {message: 'Incorrect email...'})
    @IsString({message: 'Email must be a string...'})
    readonly email: string

    @ApiProperty({example: 'justinbieberspassword2021', description: 'User\'s password'})
    @Length(8, 99, {message: 'Password must be at least 8 characters...'})
    readonly password: string
}