// File: src/purchases/purchases.module.ts

import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports: [PurchasesService], // Exporta para uso em outros módulos (Dashboard)
})
export class PurchasesModule {}
