import { NumberInput } from '@angular/cdk/coercion';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerComponent implements OnInit, DoCheck {
  @Input() color: ThemePalette;
  @Input() diameter: NumberInput = 100;
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() strokeWidth: NumberInput;
  @Input() value: NumberInput;
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displayProgressSpinner: boolean | null = false;

  /** ProgressSpinner を表示するテンプレート */
  @ViewChild('progressSpinnerRef', { static: true })
  private progressSpinnerRef!: TemplateRef<any>;

  /** オーバーレイ の構成 */
  private progressSpinnerOverlayConfig!: OverlayConfig;

  /** オーバーレイ への参照 */
  private overlayRef!: OverlayRef;

  constructor(private vcRef: ViewContainerRef, private overlay: Overlay) {}

  ngOnInit() {
    // Config for Overlay Service
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled,
    };
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig.positionStrategy = this.positionGloballyCenterStrategy();
    }
    // Create Overlay for progress spinner
    this.overlayRef = this.createOverlay(this.progressSpinnerOverlayConfig);
  }

  ngDoCheck() {
    // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
    if (this.displayProgressSpinner && !this.overlayRef?.hasAttached()) {
      this.attachTempletePortal(this.overlayRef, this.progressSpinnerRef, this.vcRef);
    } else if (!this.displayProgressSpinner && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  /**
   * 指定された構成で Overlay を生成します。
   * @param config オーバーレイの構成
   */
  createOverlay(config: OverlayConfig): OverlayRef {
    return this.overlay.create(config);
  }

  /**
   * TemplatePortal をホストに接続します。
   * @param overlayRef 接続するホスト
   * @param templateRef 埋め込まれるテンプレート
   * @param vcRef ViewContainer への参照
   */
  attachTempletePortal(overlayRef: OverlayRef, templateRef: TemplateRef<any>, vcRef: ViewContainerRef) {
    const templatePortal = new TemplatePortal(templateRef, vcRef);
    overlayRef.attach(templatePortal);
  }

  /**
   * オーバーレイを画面の中央に配置するための定義を返します。
   */
  positionGloballyCenterStrategy(): PositionStrategy {
    return this.overlay.position().global().centerHorizontally().centerVertically();
  }
}
