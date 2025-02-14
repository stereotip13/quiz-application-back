import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateResultsDTO {
  @ApiProperty({ example: '12345678901', description: 'User SNILS' })
  @IsString()
  readonly snils: string;

  @ApiProperty({ example: 85, description: 'User test results' })
  @IsNumber()
  readonly user_results: number;
}

export class UpdateResultsDTO {
  @ApiProperty({ example: 85, description: 'User test results' })
  @IsNumber()
  readonly user_results: number;
}
