import directives from './directives.ts'
import { Policy } from './interface/policy.ts'
import * as log from './log.ts'
import toCamelCase from './to-camel-case.ts'

const directivesWithCamelCase = directives.concat(directives.map(toCamelCase))

export default function(policy: Policy): boolean {
  const keys = Object.keys(policy)
  let valid = true

  if (!keys.length) {
    log.warn('Empty Policy')
    valid = false
  }

  const invalidDirectives = keys
    .filter(key => !directivesWithCamelCase.includes(key))

  if (invalidDirectives.length) {
    log.warn(`Invalid Policy Name: ${invalidDirectives.join(', ')}`)
    valid = false
  }

  return valid
}
