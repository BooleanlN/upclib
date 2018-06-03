#include<stdio.h>
#include<math.h>
# define P 100
#define Nt 100
double T[P],T0[P],Tp[P],aP[P],aE[P],aW[P],b[P],x[P],Tout[Nt][P],Time[Nt];
double lamd=41.9,dt=0.02;
double XL,dx,Sp,Sc;
double Tf,h,rc,q,c,r,qm;
double Tao,Taomax;
int It,Iout,Nout;
int N;
void read()
{
	int i;
	XL=0.12;//边界长=0.12
	N=12;//取节点数N为12
	dx=XL/(N-2);
	Tf=20.0;
	h=12.6;
	rc=0.0071;
	q=0;
	c=670;
	r=7800;
	qm=5024;
	x[0]=0;
	Taomax=3.4;
	for(i=1;i<N;i++)
      {

       if(i==1||i==N-1)
            x[i]=dx/2+x[i-1];
        else if(i>1&&i<N-1)
            x[i]=dx+x[i-1];
      }
    for(i=0;i<N;i++)
       {
           Tp[i]=20;
            T[i]=20;
           T0[i]=20;
       }
    Tao=0.0;//初始时刻
    It=0;//时间步长计数器
    Iout=0;//输出的个数
    Time[Iout]=Tao;
    Nout=10;
    for(i=0;i<N;i++)
        Tout[0][i]=T[i];
	printf(Tout[0][i]);//初始温度

}

void matrix()//
{
	int i;
	double lamd=41.9;
	do
    {

      for (i=0;i<N;i++)
	  {
			if (i!=0&&i!=N-1)
			{

				aE[i]=lamd*dt/dx;
				aW[i]=lamd*dt/dx;
				aP[i]=aE[i]+aW[i]+r*c*dx+2*h*dt*dx;
				b[i]=r*c*dx*Tp[i]+qm*exp((-3)*pow(x[i],2.0)/pow(rc,2.0))*dt*dx+2*h*Tf*dx*dt;
			}

			else if(i==0)
			{

				aE[i]=lamd*dt/dx;
				aW[i]=0;
				aP[i]=aE[i]+r*c*dx+2*h*dt*dx;
				b[i]=r*c*dx*Tp[i]+qm*exp((-3)*pow(x[i],2.0)/pow(rc,2.0))*dt*dx+2*h*Tf*dx*dt+q*dt;

			}
			else if(i==N-1)
			{
				aE[i]=0;
				aW[i]=lamd*dt/dx;;
				aP[i]=aE[i]+r*c*dx+2*h*dt*dx;
				b[i]=r*c*dx*Tp[i]+qm*exp((-3)*pow(x[i],2.0)/pow(rc,2.0))*dt*dx+2*h*Tf*dx*dt+q*dt;

			}
	  }
    Tao=Tao+dt;
    It=It+1;
	for(i=1;i<N-1;i++)
	{
        
		T[i]=aE[i]*T[i+1]+aW[i]*T[i-1]+b[i];
        T[i]=T[i]/aP[i];

        if(fmod(It,Nout)==0.0)
       {
         Iout=Iout+1;
         Time[Iout]=Tao;
         for(i=0;i<N;i++)
            Tout[Iout][i]=T[i];
       }
	}
     for(i=0;i<N;i++)
    Tp[i]=T[i];
    }while(Tao<=Taomax);


}

double check()
{
    int i;
    double esum=0;
    for(i=0;i<N;i++)
    {

            esum+=fabs(T[i]-T0[i])/T[i];
            T0[i]=T[i];

    }
    return(esum);
}
void output()
{
    int i,j;
    x[0]=0;
    for(i=0;i<N;i++)
    {
        if(i==1||i==N-1)
            x[i]=dx/2+x[i-1];
        else if(i>1&&i<N-1)
            x[i]=dx+x[i-1];
        printf(" %6.2f",x[i]);
    }
    printf("\n");
    for(j=0;j<Iout;j++)
    {
        printf("%7.2f",Time[j]);
        for(i=0;i<N;i++)
           printf("%7.2lf",Tout[j][i]);
        printf("\n");

    }


}
int main()
{
    int i;
    double e,eps=0.00001;
	read();
	for(i=0;;i++)
       {
	            matrix();

	            e=check();
	            if(e<eps)
                 break;

        }
     output();
     return 0;
}

