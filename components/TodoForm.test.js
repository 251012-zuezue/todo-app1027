
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TodoForm from './TodoForm'

// 1. getByRole で入力欄を探せる
test('getByRole で入力欄を探せる', () => {
  render(<TodoForm onAdd={() => {}} />)

  expect(
    screen.getByRole('textbox', { name: 'やること' })
  ).toBeInTheDocument()
})

// 2. getByLabelText で入力欄を探せる
test('getByLabelText で入力欄を探せる', () => {
  render(<TodoForm onAdd={() => {}} />)

  expect(screen.getByLabelText('やること')).toBeInTheDocument()
})

// 3. getByPlaceholderText で入力欄を探せる
test('getByPlaceholderText で入力欄を探せる', () => {
  render(<TodoForm onAdd={() => {}} />)

  expect(
    screen.getByPlaceholderText('やることを入力')
  ).toBeInTheDocument()
})

// 4. 入力して「追加」を押すと、onAdd が入力した文字で呼ばれる
test('入力して「追加」を押すと、onAdd が入力した文字で呼ばれる', async () => {
  const user = userEvent.setup()
  const handleAdd = jest.fn()

  render(<TodoForm onAdd={handleAdd} />)

  await user.type(
    screen.getByRole('textbox', { name: 'やること' }),
    '牛乳を買う'
  )

  await user.click(screen.getByRole('button', { name: '追加' }))

  expect(handleAdd).toHaveBeenCalledWith('牛乳を買う')
})

// 5. Enter キーでも追加でき、前後の空白は取り除かれ、入力欄が空に戻る
test('Enter キーでも追加でき、前後の空白は取り除かれ、入力欄が空に戻る', async () => {
  const user = userEvent.setup()
  const handleAdd = jest.fn()

  render(<TodoForm onAdd={handleAdd} />)

  const input = screen.getByRole('textbox', { name: 'やること' })

  await user.type(input, '  レポート提出  {Enter}')

  expect(handleAdd).toHaveBeenCalledWith('レポート提出')
  expect(input).toHaveValue('')
})

// 6. 空白だけなら onAdd は呼ばれない
test('空白だけなら onAdd は呼ばれない', async () => {
  const user = userEvent.setup()
  const handleAdd = jest.fn()

  render(<TodoForm onAdd={handleAdd} />)

  await user.type(
    screen.getByRole('textbox', { name: 'やること' }),
    '   {Enter}'
  )

  expect(handleAdd).not.toHaveBeenCalled()
})

