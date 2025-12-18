import React, { useState } from "react";
import "./partners.css";

function Partners() {
  return (
    <div className="psliderContainer">
      <div className="pslider">
        <div className="pslide-track">
          <div class="pslide">
            <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/bibb.png"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Federal kasb-hunar ta'limi instituti (BIBB)</h2>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/ripo.png"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Respublika professional ta'lim instituti (РИПО)</h2>
              </div>
            </div>
          </div>
          <div class="pslide">
             <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/irpo.jpg"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Professional ta'limni rivojlantirish instituti (ИРПО)</h2>
              </div>
            </div>
          </div>
          <div class="pslide">
             <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/shvedsariyaInstitut.png"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shvetsariya kasbiy ta'lim va o‘qitish federal universiteti (SFUVET)</h2>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/talap.png"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">"TALAP" Notijorat aksiyadorlik jamiyati</h2>
              </div>
            </div>
          </div>
          {/* <div class="pslide">
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-ghost">Deny</button>
                </div>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-ghost">Deny</button>
                </div>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-ghost">Deny</button>
                </div>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-ghost">Deny</button>
                </div>
              </div>
            </div>
          </div> */}
          {/* ========== */}
         <div class="pslide">
            <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/bibb.png"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Federal kasb-hunar ta'limi instituti (BIBB)</h2>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/ripo.png"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Respublika professional ta'lim instituti (РИПО)</h2>
              </div>
            </div>
          </div>
          <div class="pslide">
             <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/irpo.jpg"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="w-1/2">
                <h2 className="card-title border border-amber-400 shrink-0">Professional ta'limni rivojlantirish instituti (ИРПО)</h2>
              </div>
            </div>
          </div>
          <div class="pslide">
             <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/shvedsariyaInstitut.png"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shvetsariya kasbiy ta'lim va o‘qitish federal universiteti (SFUVET)</h2>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card card-side bg-base-300 h-full shadow-sm p-3">
              <figure className="w-1/2">
                <img
                  src="/talap.png"
                  alt="Movie"
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">"TALAP" Notijorat aksiyadorlik jamiyati</h2>
              </div>
            </div>
          </div>
          {/* <div class="pslide">
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-ghost">Deny</button>
                </div>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-ghost">Deny</button>
                </div>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-ghost">Deny</button>
                </div>
              </div>
            </div>
          </div>
          <div class="pslide">
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Cookies!</h2>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-ghost">Deny</button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Partners;
