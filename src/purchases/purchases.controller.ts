// File: src/purchases/purchases.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';  // Importando a entidade Purchase

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  // Endpoint para realizar compra de curso
  @Post('buy')
  buyCourse(@Body() createPurchaseDto: CreatePurchaseDto): Promise<{ message: string; purchase: Purchase }> {
    return this.purchasesService.buy(createPurchaseDto);  // Agora retorna uma Promise<{ message: string; purchase: Purchase }>
  }

  // Listar todas as compras
  @Get()
  findAll(): Promise<Purchase[]> {
    return this.purchasesService.findAll();  // Agora retorna uma Promise<Purchase[]>
  }

  // Listar compras de um usuário
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<Purchase[]> {
    return this.purchasesService.findByUser(+userId);  // Agora retorna uma Promise<Purchase[]>
  }

  // Atualizar status de uma compra
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<{ message: string; purchase: Purchase }> {
    return this.purchasesService.update(+id, updatePurchaseDto);  // Agora retorna uma Promise<{ message: string; purchase: Purchase }>
  }

  // Remover uma compra
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.purchasesService.remove(+id);  // Agora retorna uma Promise<{ message: string }>
  }
}
