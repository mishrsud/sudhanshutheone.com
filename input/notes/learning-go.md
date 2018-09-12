---
title: Learning resources and notes from my experience with [Go lang](https://golang.org)
---

### Resource
https://www.safaribooksonline.com/videos/introduction-to-go/9781491913871/9781491913871-video191842
**List of open source libraries**
https://awesome-go.com/

### Debugging in VS Code
Follow instructions [here](https://github.com/derekparker/delve) to setup Delve. Add a launch config using the Debug button on the left panel:
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "remotePath": "",
            "port": 2345,
            "host": "127.0.0.1",
            "program": "${fileDirname}",
            "env": {},
            "args": [],
            "showLog": false
        }
    ]
}
```

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

## Array and Slice
- Array -> Fixed length collection of items
- Slice -> Variable length collection

### Declare and iterate a Slice
```go
package main

import "fmt"

func main() {
    days := []string {"Monday","Tuesday","Wednesday"}

    for index, day := range days {
        fmt.Println(index, day)
    }
}
```

### Pass by value and pointers
- By default, when passing a type, Go passes a copy of the value 
```go
type person struct {
    firstName string
    lastName string
}

// This method does not operate on the initial value of 
// person. It works with a copy of person
func (p person) updateName(newName string) {
    p.firstName = "Newname" 
}
```

- To get access to the reference, Go uses pointers
```go
myPerson := person{firstName: "Clark", lasName: "Kent"}

myPersonPointer := &myPerson
valueAtPointer := *myPersonPointer

// In a receiver function, the * notation implies a value of type specified
// e.g. below function receives the value of type person
func (p *person) updateName(newName string) {
    (*p).firstName = "Claire"
}
```
**Memory aid:**
```text
Turn |address| into |value| with *address
Turn |value| into |address| with &value
```

- Concise definition of type and methods on it
```go
type person struct {
    firstName string
    lastName string
}

func (p *person) updateFirstName(newFirstName string) {
    p.firstName = newFirstName
}
```

### Maps 
- maps are Key-value pairs
```go
// http://bit.ly/2Lw3BFG 
myMap := map[int]string // a map whose keys are integers and values are strings
myMap = make(map[int]string) // create an instance
myMap[0] = "C#"

//access value
myMap[1]

// check if value exists
val,found := myMap[0]
	if found {
		fmt.Println("found", val)
	} else {
		fmt.Println("NOT found")
	}
```