ALGORITMO FIXTURE_format_all_productions;

TYPE
    Enum_Inline: enum { a, b };
    Enum_Multiple: enum
    {
        a <- 0,
        b
    };
    People: struct
    {
        name: string;
        age: int;
        height: real;
        father: People;
        childrens: vetor[N] de People;
        disabled: boolean;
    };

CONST
    Const_Simple <- 0;
    Const_Expression <- 1 + 1;

VAR
    single: real;
    multiple, declaration: inteiros;
    list_with_number: vetor[10] de inteiros;
    list_with_const_and_type: vetor[N][J] de People;
    with_defined_type: People;

INICIO
    simple_assignment <- 0;
    qualified.variable[0].with.unary_suffix++;
    qualified.variable[N].with.unary_suffix--;
    qualified.variable <- qualified.variable + 1 ? 2 : 3;
    expression <- !(!1 + 2 - 3 * 4 / 5 % 6 > (x.y && z));
    
    //===================================> Control Statments
    
    // Iteration Statements
    
    FAÇA
    {
        x <- 0;
    }
    ENQUANTO (condicao);
    
    ENQUANTO (condicao) FAÇA
    {
        x <- 0;
    }
    
    PARA (index <- 0; index < N; index++) FAÇA
    {
        LER m[index];
    }
    
    // Conditional Statements
    
    SE (condicao) ENTÃO
    {
        nome_da_variavel <- valor;
    }
    
    SE (condicao) ENTÃO
    {
        nome_da_variavel <- valor;
    }
    SENÃO
    {
        nome_da_variavel <- valor;
    }
    
    SE (condicao) ENTÃO
        x <- 0;
    SENÃO x <- 0;
    
    SE (condicao) ENTÃO
        x <- 0;
    SENÃO
    {
        x <- 0;
    }
    
    SE (condicao) ENTÃO
        x <- 0;
    SENÃO SE (condicao) ENTÃO
    {
        x <- 0;
    }
    
    SE (condicao) ENTÃO
        x <- 0;
    SENÃO SE (condicao) ENTÃO
        x <- 0;
    SENÃO SE (condicao) ENTÃO
        x <- 0;
    SENÃO x <- 0;
    
    SE (condicao) ENTÃO
        x <- 0;
    SENÃO SE (condicao) ENTÃO
    {
        nome_da_variavel <- valor;
    }
    SENÃO SE (condicao) ENTÃO
    {
        nome_da_variavel <- valor;
    }
    
    SE (condicao) ENTÃO
    {
        SE (condicao) ENTÃO
        {
            x <- 0;
        }
        
        SE (condicao) ENTÃO
            x <- 0;
        
        SE (condicao) ENTÃO
        {
            x <- 0;
        }
        SENÃO
        {
            x <- 0;
        }
        
        SE (condicao) ENTÃO
            x <- 0;
        SENÃO x <- 0;
    }
    
    AVALIE (variavel)
    {
        QUANDO "case_block" FAÇA
        {
            x <- 0;
        }
        QUANDO "case_block_with_statement_block" FAÇA
        {
            SE (condicao) ENTÃO
            {
                x <- 0;
            }
        }
        QUANDO "case_block_with_statement_inline" FAÇA
        {
            SE (condicao) ENTÃO
                x <- 0;
        }
        CASO_CONTRARIO FAÇA
        {
            x <- 0;
        }
    }
    
    AVALIE (variavel)
    {
        QUANDO "case_inline" FAÇA: x <- 0;
        QUANDO "case_inline_with_statement_inline" FAÇA:
            SE (condicao) ENTÃO
                x <- 0;
        QUANDO "case_inline_with_statement_block" FAÇA:
            SE (condicao) ENTÃO
            {
                x <- 0;
            }
        CASO_CONTRARIO FAÇA: x <- 0;
    }
    
    //===================================> Opetations Statements
    PRINT x, x OU z;
    READ x, x.y, x[10].y, x[y].z;
FIM.
