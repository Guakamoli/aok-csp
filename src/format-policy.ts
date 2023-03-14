import directives from './directives.ts'
import { Policy } from './interface/policy.ts'
import repareSingleQuotes from './repare-single-quotes.ts'
import toCamelCase from './to-camel-case.ts'


export default function(policy: Policy): string[][] {
  return directives
    .filter(directive => Boolean(policy[directive]) || Boolean(policy[toCamelCase(directive)]))
    .map(directive => {
      const area = (policy[directive] || policy[toCamelCase(directive)] || [])
        .map(repareSingleQuotes)

      return [directive, ...area]
    })
}
