import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMock from './user'
import articleMock from './article'
import searchMock from './remote-search'
import routeMock from './role'

export const mockModules = [
  ...userMock,
  ...articleMock,
  ...searchMock,
  ...routeMock
]

export function setupMockServer() {
  createProdMockServer(mockModules)
}
