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
  buy(createPurchaseDto: CreatePurchaseDto): Promise<{ message: string; purchase: Purchase }> {
    const purchase: Purchase = {
      id: this.nextId++,
      userId: createPurchaseDto.userId,
      courseId: createPurchaseDto.courseId,
      date: new Date(),
      status: 'completed',
    };
    this.purchases.push(purchase);
    return Promise.resolve({ message: 'Compra realizada com sucesso', purchase });  // Retornando uma Promise
  }

  // Lista todas as compras
  findAll(): Promise<Purchase[]> {
    return Promise.resolve(this.purchases);  // Envolvendo o retorno com Promise.resolve()
  }

  // Lista compras de um usuário específico
  findByUser(userId: number): Promise<Purchase[]> {
    return Promise.resolve(this.purchases.filter(p => p.userId === userId));  // Envolvendo com Promise.resolve()
  }

  // Atualiza o status de uma compra
  update(id: number, updateDto: UpdatePurchaseDto): Promise<{ message: string; purchase: Purchase }> {
    const purchase = this.purchases.find(p => p.id === id);
    if (!purchase) {
      throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    }
    if (updateDto.status) {
      purchase.status = updateDto.status;
    }
    return Promise.resolve({ message: 'Compra atualizada com sucesso', purchase });  // Retornando uma Promise
  }

  // Remove uma compra
  remove(id: number): Promise<{ message: string }> {
    const index = this.purchases.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    }
    this.purchases.splice(index, 1);
    return Promise.resolve({ message: 'Compra removida com sucesso' });  // Retornando uma Promise
  }

  // Exemplo de método de estatística usado no Dashboard
  getTotalSales(): number {
    return this.purchases.length;
  }

  // Exemplo de cálculo de avaliação média usado no Dashboard (placeholder)
  getAverageCourseRating(): number {
    return 4.5; // valor fixo para exemplo
  }
}
