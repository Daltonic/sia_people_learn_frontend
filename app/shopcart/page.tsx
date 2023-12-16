'use client'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center md:px-5 md:mt-10">
          <div className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
            Shop Cart
          </div>
          <div className="text-slate-600 text-center text-md mt-3 capitalize w-full">
            We are on a mission to deliver engaging, curated courses at a
            reasonable price.
          </div>
        </div>
        <div className="flex justify-between items-center bg-[#F5F7FE] text-[#C5165D] font-medium h-20 p-10 rounded-md w-5/6 mt-14">
          <div className="">
            <p className="">Product</p>
          </div>
          <div className="">
            <p className="">Price</p>
          </div>
          <div className="">
            <p className="">Quantity</p>
          </div>
          <div className="">
            <p className="">Subtotal</p>
          </div>
          <div className="">
            <p className="">Remove</p>
          </div>
        </div>
        {/* <div>
          {cartProducts.map((elm: Course, i: number) => (
            <div key={i} className="">
              <div className="">
                <div className="">
                  <div
                    className=""
                    style={{ backgroundImage: `url(${elm.imageSrc})` }}
                  ></div>
                </div>
                <div className="">
                  <Link className="" href={`/shop/${elm.id}`}>
                    {elm.title}
                  </Link>
                </div>
              </div>

              <div className="">
                <div className="">Price</div>
                <p>${elm.originalPrice}</p>
              </div>

              <div className="">
                <div className="">Quantity</div>

                <div className="">
                  <input
                    required
                    className=""
                    type="number"
                    placeholder="value..."
                    value={elm.quantity}
                  />

                  <div className="">
                    <button className="">
                      <FaMinus />
                    </button>

                    <button className="">
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="">Subtotal</div>

                <p>${(elm.quantity * elm.price).toFixed(2)}</p>
              </div>

              <div className="m">
                <FaTimes />
              </div>
            </div>
          ))}

          <div>
            {cartProducts.length > 0 ? (
              <div>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input required type="text" placeholder="Coupon Code" />
                      <button type="submit">Apply coupon</button>
                    </div>
                  </form>
                </div>

                <div>
                  <div>
                    <button>Update cart</button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <Link href="/shop-list">Buy Products</Link>
                </div>
              </div>
            )}
          </div>

          <div>
            <div>
              <h5>Cart Totals</h5>

              <div>
                <div>Subtotal</div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>

              <div>
                <div>Total</div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>
            </div>

            <Link href="/shop-checkout">Proceed to checkout</Link>
          </div>
        </div> */}
      </div>
    </Layout>
  )
}

export default Page
