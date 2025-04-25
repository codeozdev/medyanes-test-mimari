export default function AboutPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Hakkımızda</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hikayemiz
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            2023 yılında kurulan şirketimiz, modern web teknolojileri kullanarak işletmelerin
            dijital dönüşümüne katkıda bulunmak amacıyla yola çıktı.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="gap-x-8 gap-y-10 lg:gap-y-16">
            <div className="prose max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius faucibus massa
                sollicitudin amet augue. Nibh metus a semper purus mauris duis. Lorem eu volutpat
                lectus justo, magna mauris, tristique erat. Tempor, rutrum erat eu viverra fusce.
                Venenatis, diam duis lorem enim dui vehicula suspendisse ornare nulla.
              </p>

              <h3 className="mt-8 text-xl font-bold">Misyonumuz</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>

              <h3 className="mt-8 text-xl font-bold">Vizyonumuz</h3>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>

              <h3 className="mt-8 text-xl font-bold">Ekibimiz</h3>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
