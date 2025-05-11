import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>,
  ) {}

  async buy(createPurchaseDto: CreatePurchaseDto): Promise<{ message: string; purchase: Purchase }> {
    const purchase = this.purchaseRepo.create({
      userId: createPurchaseDto.userId,
      courseId: createPurchaseDto.courseId,
      date: new Date(),
      status: 'completed',
    });
    const saved = await this.purchaseRepo.save(purchase);
    return { message: 'Compra realizada com sucesso', purchase: saved };
  }

  findAll(): Promise<Purchase[]> {
    return this.purchaseRepo.find();
  }

  findByUser(userId: number): Promise<Purchase[]> {
    return this.purchaseRepo.find({ where: { userId } });
  }

  async update(
    id: number,
    updateDto: UpdatePurchaseDto,
  ): Promise<{ message: string; purchase: Purchase }> {
    const purchase = await this.purchaseRepo.findOneBy({ id });
    if (!purchase) throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    Object.assign(purchase, updateDto);
    const updated = await this.purchaseRepo.save(purchase);
    return { message: 'Compra atualizada com sucesso', purchase: updated };
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.purchaseRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    return { message: 'Compra removida com sucesso' };
  }

  getTotalSales(): Promise<number> {
    return this.purchaseRepo.count();
  }

  async getAverageCourseRating(): Promise<number> {
    // Placeholder: implementar se necessário
    return 4.5;
  }
}