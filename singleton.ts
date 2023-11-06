// Prisma Mock for jest
// https://www.prisma.io/docs/guides/testing/unit-testing

import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma_db from './prisma/db'

jest.mock('./prisma/db', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma_db as unknown as DeepMockProxy<PrismaClient>