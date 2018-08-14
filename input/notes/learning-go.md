---
---

### Resource
https://www.safaribooksonline.com/videos/introduction-to-go/9781491913871/9781491913871-video191842

### Getting Started

#### Go Playground
- https://play.golang.org/

#### Structure of a Go program
- declaration of a function has to have the braces immediately after name and parameter list
```go
// valid
func Whatever() {

}

// INVALID
func Whatever() 
{
    // Error: missing function body
}
```
- the first line declares the package the program is part of 
```go
package main
```

- Using a function from go standard library
```go
import (
    "fmt"
)

// use
func SayHello() {
    fmt.Printf("Hello World")
}
```

- Strings are Unicode and are made up of [**runes**](https://blog.golang.org/strings)

## Directory Structure in Go
```
TopLevel
    |
   src
     |
     program_name
         |
         main.go
// Example
helloworld
 |
 src
   |
   hello
      |
      main.go
// directory path C:\Source\hw\src\hello\main.go
```

- Produce an executable
```bash
C:\Source\helloworld> go install hello
# This will create a bin directory and 
# create a hello.exe in bin
```

### Documentation for Go
- Online at [golang.org/pkg](https://golang.org/pkg/)
- Local: godoc tool
```
godoc fmt printf
```

## Variables, Simple Types and declarations
- Declare, then assign
```go
var message string
message = "Hello World\n"
```

- Short-hand: Declare and assign together
```go
// message is a new variable that holds a string
message := "Hello World\n"
```

- Declare constants 
```go
package main

import (
    "fmt"
)

const (
    message = "%d %d\n"
    answer1 = iota // iota is 1 by default
    answer2
)

func main() {
    fmt.Printf(message, answer1, answer2)
    // Prints 1 2
}
```

- Number types
  - Float
```go
var pi float64 = 3.14
fmt.Printf("Value %f\n", pi) // prints 3.140000
fmt.Printf("Value %.2f\n", pi) // prints 3.14
```
  - Integer
```go
var nine int = 9
var ninE = int(9)
// uint, 
```

> There doesn't appear to be a decimal type in the standard library

Different variable declarations
```go
package main

import (
	"fmt"
	"time"

	"github.com/shopspring/decimal"
)

func main() {
	var message string
	var nine int = 9
	var ni = uint(9)
	isTrue := true
	what := decimal.NewFromFloat(10.50)

	message = time.Now().Format("Mon Jan 02 15:04:05 2006")
	fmt.Println("Hello World\n" + message)
	fmt.Printf("Number %d %d\n", nine, ni)
	fmt.Printf("True? %t\n", isTrue)
	fmt.Println("What? ", what)
}
```

## Formatting Date and Time
- https://golang.org/pkg/time/#pkg-constants