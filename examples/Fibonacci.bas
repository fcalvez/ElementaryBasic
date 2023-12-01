var v1,v0,i,v2
i <- 0  // position
v0 <- 0 // previous value
v1 <- 1 // current value
:loop
	print iteration $i : $v1
	v2 <- v1 + v0
	v0 <- v1
	v1 <- v2
	i <- i + 1
	jumpto:loop
