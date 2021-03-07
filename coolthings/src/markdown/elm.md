# ELM to someone coming from JS

> the language with a weird cube puzzle as a logo that explodes into different shapes!

:snowman:
---

### values

```elm
True -- Bool
1 -- number
1.1 -- Float (still a number)
"fantastic" -- String
'f' -- Char
[ "list", "of", "strings" ] -- List String
("tuple", "of", 42) -- (String, String, number) tuples can only have 2 to 3 elements!? weird!
{ a = "record", b = "of", c = 4, d = "things"} -- Record are like JS objects with `=` 
```

- all elements in a list must have the same type
- lists are kinda like JS arrays
- tuples are weirdly constrained to min 2, and max 3 elements! (I guess it does fine for most things?), immutable, also `Tuple.first`, `Tuple.second`, `Tuple.third`... WEIRD!!
- records are like JS objects

### functions

```ts
const shout = (word: string) => {
    return `${word}!!!`
}
```

becomes

```elm
shout word =
    word ++ "!!!"
```

- no token prefixes the definition of a function, no parentheses!
- just start with the function `name`, then `spaces` to separate param signature, lastly finish with an `=`
- string manipulation: concatenation operator is `++`