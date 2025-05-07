// File: src/purchases/purchases.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

interface Purchase {
  id: number;
  userId: number;
  courseId: number;
  date: Date;
  status: 'pending' | 'completed' | 'canceled';
}

@Injectable()
export class PurchasesService {
  private purchases: Purchase[] = [];
  private nextId = 1;

  // Simula a compra de um curso
  buy(createPurchaseDto: CreatePurchaseDto) {
    const purchase: Purchase = {
      id: this.nextId++,
      userId: createPurchaseDto.userId,
      courseId: createPurchaseDto.courseId,
      date: new Date(),
      status: 'completed',
    };
    this.purchases.push(purchase);
    return { message: 'Compra realizada com sucesso', purchase };
  }

  // Lista todas as compras
  findAll() {
    return this.purchases;
  }

  // Lista compras de um usuário específico
  findByUser(userId: number) {
    return this.purchases.filter(p => p.userId === userId);
  }

  // Atualiza o status de uma compra
  update(id: number, updateDto: UpdatePurchaseDto) {
    const purchase = this.purchases.find(p => p.id === id);
    if (!purchase) {
      throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    }
    if (updateDto.status) {
      purchase.status = updateDto.status;
    }
    return { message: 'Compra atualizada com sucesso', purchase };
  }

  // Remove uma compra
  remove(id: number) {
    const index = this.purchases.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    }
    this.purchases.splice(index, 1);
    return { message: 'Compra removida com sucesso' };
  }

  // Exemplo de método de estatística usado no Dashboard
  getTotalSales() {
    return this.purchases.length;
  }

  // Exemplo de cálculo de avaliação média usado no Dashboard (placeholder)
  getAverageCourseRating() {
    return 4.5; // valor fixo para exemplo
  }
}
