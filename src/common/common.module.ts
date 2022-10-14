import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { NestAxiosAdapter } from './adapters/http-service.adaper';
import { HttpService, HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        AxiosAdapter,
        NestAxiosAdapter
    ],
    exports: [
        AxiosAdapter,
        NestAxiosAdapter
    ]
})
export class CommonModule {}
