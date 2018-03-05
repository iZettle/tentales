import { getDefaultHooks } from "../default-hooks"

test("It gets public default hooks", async () => {
  const resp = getDefaultHooks({ isPublic: true })
  expect(resp).toMatchSnapshot()
})

test("It gets private default hooks", async () => {
  const resp = getDefaultHooks({ isPublic: false })
  expect(resp).toMatchSnapshot()
})
