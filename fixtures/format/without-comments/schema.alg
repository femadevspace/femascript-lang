ALGORITMO
            FIXTURE_format_without_comments
    ; VAR
n,
    a
 , b  , 
resultado
:     inteiros  ;

INICIO

LEIA    n

; SE(n<0) ENTÃO { ESCREVA "O índice dever ser maior ou igual a zero."; } 
SENÃO SE
(
    n = 0
    OU
    n = 1
)
            ENTÃO { resultado <- n; }
SENÃO { a <- 0; b <- 1;

                PARA (
                    i <- 2;
                    i <= n;
                    i++
                ) FACA {
resultado <- a + b;
a <- b;
b <- resultado;
                     }}

    IMPRIMA 
        "O resultado para F(", 
        n, ") é: ", 
        resultado
;

FIM.