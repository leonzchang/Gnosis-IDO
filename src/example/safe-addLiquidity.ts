import { BSCT_SAFE_ADDRESS, Token_1_ADDRESS, Token_2_ADDRESS } from '../constant'
import { addLiquidity } from '../pancakeswap/addLiquidity'

addLiquidity(Token_1_ADDRESS, Token_2_ADDRESS, 100, 100, 100, 100, BSCT_SAFE_ADDRESS).catch(
  console.error
)
