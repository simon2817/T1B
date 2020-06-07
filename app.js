///SOLUCIÓN DE SISTEMAS DE ECUACIONES 3x3

//Cálculo del determinante de una matriz A(3x3)
function det(A) {

	/*
		        |a b c|
		Sea A = |d e f|
		        |g h i|
		entonces det(A) = aei + bfg + cdh - ceg - afh - bdi
		Considerando:
			a = A[0][0], b = A[0][1], c = A[0][2]
			d = A[1][0], e = A[1][1], f = A[1][2]
			g = A[2][0], h = A[2][1], i = A[2][2]
	*/

	var result = 0; //valor total del determinante
	for(var i = 0; i < 3; i++) { 
	/*
		i  indica la diagonal actual que se está multiplicando.
		v1 indica el producto de los valores de la diagonal i que va de izquierda-arriba hacia derecha-abajo
		v2 indica el producto de los valores de la diagonal i que va de derecha-arriba hacia izquierda-abajo
		si i = 0:
			v1 = aei
			v2 = ceg
		si i = 1:
			v1 = bfg
			v2 = afh
	*/
		var v1 = 1; 
		var v2 = 1;
		for(var j = 0; j < 3; j++) {
			//Se realiza la multiplicación de los valores de las diagonales.
			v1 *= A[j][(i + j) % 3];
			v2 *= A[j][2 - (i + j) % 3];
		}
		//Se suman los productos de las diagonales
		result += v1 - v2;
	}
	return result;
};

//Devuelve una copia de la matriz A
function copy(A) {
	//crea un vector _ de 3x1
	var _ = new Array(3);
	//Recorrer cada fila de _
	for(var i = 0; i < 3; i++) {
		_[i] = new Array(3); //Cada fila de _ tiene tres elementos
		for(var j = 0; j < 3; j++) {
			_[i][j] = A[i][j]; //Cada elemento i,j de _ se iguala al valor del elemento i,j de A
		}
	}
	return _;
}
//Reemplaza los valores de la j-ésima columna de A(3x3) por el vector V(3x1).
//NOTA: NO se modifica la matriz original, sino que se devuelve una copia modificada.
function row(A, j, v) {
	var _ = copy(A); //crear copia de A
	for(var i = 0; i < 3; i++) {
		//Se reemplaza el elemento i de cada fila de A, por el elemento i del vector v.
		_[i][j] = v[i];
	}
	return _;
}

//Resuelve un sistema de ecuaciones dado por una matriz 3x3 con coeficientes 
//y un vector 3x1 con los valores independientes usando la regla de Cramer
function solve(mat, val) {
	var detA = det(mat); //determinante de la matriz de coeficientes
	var Aj, detAj;

	var res = new Array(3); //vector de resultados
	for(var i = 0; i < 3; i++) {
		//matriz A en donde la i-ésima columna se ha reemplazado por el vector de valores independientes
		Aj = row(copy(mat), i, val); 
		//determinante de Aj
		detAj  = det(  Aj  );
		//Solución i
		res[i] = detAj / detA;
	}

	return res;
}

//======================PRUEBA======================//
/*
Resolver el siguiente sistema de ecuaciones lineales:
	2x +  y - 3z =   7
	5x - 4y +  z = -19
	 x -  y - 4z =   4
*/

//Matriz A de coeficientes:
var A = [
	[2, 1, -3],
	[5, -4, 1],
	[1, -1, -4]
];
//Vector V de valores independientes
var V = [7, -19, 4];

//Vector r de vector solución
var r = solve(A, V);

//Imprimir r
console.log(r);
/*
Imprime:
	[-1, 3, -2]
Es decir que:
	x = -1
	y =  3
	z = -2
*/