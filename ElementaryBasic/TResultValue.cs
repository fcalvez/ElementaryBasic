using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElementaryBasic
{
    class TResultValue<T>
    {
        public T Value
        {
            get;
            private set;
        }

        public ResultCode Result
        {
            get;
            internal set;
        }


        public TResultValue(T value, ResultCode result)
        {
            Value = value;
            Result = result;
        }
    }
}
