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

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  // Endpoint para realizar compra de curso
  @Post('buy')
  buyCourse(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.buy(createPurchaseDto);
  }

  // Listar todas as compras
  @Get()
  findAll() {
    return this.purchasesService.findAll();
  }

  // Listar compras de um usuário
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.purchasesService.findByUser(+userId);
  }

  // Atualizar status de uma compra
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchasesService.update(+id, updatePurchaseDto);
  }

  // Remover uma compra
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(+id);
  }
}
